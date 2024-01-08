import {CategoryModel} from "./CategoryModel";
import {TypeModel} from "./TypeModel";

export interface CarModel {
    id: string;
    make: string;
    model: string;
    category: CategoryModel;
    gosNumber: string;
    type: TypeModel;
    yearIssue: number;
    trailer: boolean;
}