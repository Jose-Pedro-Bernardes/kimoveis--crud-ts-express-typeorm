import { Request, Response } from "express";
import { createRealEstateService } from "../services/realEstate/createNewRealEstate.service";
import { getRealEstateService } from "../services/realEstate/getRealEstate.service";

const createRealEstateController = async (req: Request, res: Response) => {
  const requestData = req.body;

  const newRealEstate = await createRealEstateService(requestData);

  return res.status(201).json(newRealEstate);
};

const getRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstate = await getRealEstateService();
  return res.json(realEstate);
};

export { createRealEstateController, getRealEstateController };
