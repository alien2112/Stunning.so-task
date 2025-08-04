export interface Section {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface WebsiteIdea {
  _id: string;
  prompt: string;
  sections: Section[];
  createdAt: string;
}

export interface CreateWebsiteIdeaRequest {
  prompt: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
