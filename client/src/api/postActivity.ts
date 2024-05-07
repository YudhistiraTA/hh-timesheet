import { Activity } from "@/models/activity";
import axios from "axios";

export default async function postActivity(activity: Activity) {
  return axios
    .post(`${import.meta.env.VITE_BASE_URL}/activities`, activity)
    .then((res) => res.data as Activity)
}