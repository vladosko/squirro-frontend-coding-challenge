import { WebApi } from "../models/web-api.model";

interface Result
  extends Partial<Record<WebApi.ResourceTypes, Record<string, any>>> {}

export const normalize = ({ data, included }: WebApi.PackedJson): Result => {
  return Array.isArray(data)
    ? normalizeArray(data, included)
    : normalizeObject(data, included);
};

const normalizeObject = (
  data: WebApi.Data,
  included: WebApi.Included[]
): Result => {
  const dataType = data.type;
  const result: Result = { [dataType]: [{ ...data }] };

  if (data.relationships) {
    resolveRelationships(
      data.relationships,
      included,
      result[data.type] as WebApi.Data<WebApi.ResourceTypes>
    );
  }

  return result;
};

const normalizeArray = (
  data: WebApi.Data[],
  included: WebApi.Included[]
): Result => {
  const dataType = data[0].type;
  let result: Result = { [dataType]: [] };

  data.forEach((item, idx) => {
    result[dataType]!.push({ ...item });

    if (item.relationships) {
      resolveRelationships(
        item.relationships,
        included,
        result[dataType]![idx]
      );
    }
  });

  return result;
};

const resolveRelationships = (
  relationships: Partial<WebApi.Relationships>,
  included: WebApi.Included[],
  result: WebApi.Data<WebApi.ResourceTypes>
) => {
  Object.values(relationships).forEach(({ data }) => {
    if (Array.isArray(data)) {
      data.forEach((rel, idx) => {
        let rawRel = findByRelationship(included, rel);
        if (rawRel?.relationships) {
          resolveRelationships(rawRel.relationships, included, rawRel);
        }
        if (!result[rel.type]) {
          result[rel.type] = [];
        }
        if (rawRel) {
          (result[rel.type] as WebApi.Reference<WebApi.ResourceTypes>[]).push(
            rawRel
          );
        }
      });
    } else {
      const rawRel = findByRelationship(included, data);
      if (rawRel?.relationships) {
        resolveRelationships(rawRel?.relationships, included, rawRel);
      }
      if (rawRel) {
        result[data.type] = [rawRel];
      }
    }
    delete result.relationships;
  });
};

const findByRelationship = (
  included: WebApi.Included[],
  source: WebApi.Reference<WebApi.ResourceTypes>
) => {
  return included.find(
    (includedItem: any) =>
      includedItem.type === source.type && includedItem.id === source.id
  );
};
