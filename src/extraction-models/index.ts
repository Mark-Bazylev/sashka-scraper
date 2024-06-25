import { amazonExtractionModel } from "./amazon";
import { ebayExtractionModel } from "./ebay";
import { ExtractionModelBase } from "./extraction-model-base";

export const extractionModels: Record<string, ExtractionModelBase> = {
  amazon: amazonExtractionModel,
  ebay: ebayExtractionModel,
};
