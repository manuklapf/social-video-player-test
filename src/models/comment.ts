import User from "@/models/user";

export default interface Comment {
  id: number;
  videoId: number;
  text: string;
  createdAt: string;
  timestamp: number;
  user: User;
  drawingAsSVG: string;
  drawingAsJson: string;
}
