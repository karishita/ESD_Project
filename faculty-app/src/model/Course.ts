import type {TimeSlot} from "./TimeSlot";
export interface Course
{
    id:number;
    courseName:string;
    credits:number;
    capacity:number;
    timeSlots:TimeSlot[];
}