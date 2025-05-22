import { Client, Databases, Query } from "appwrite";
import { type Models } from "appwrite";

export interface Portfolio extends Models.Document {
  title: string;
  description?: string;
  appleUrl?: string;
  googleUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  isHighlighted?: boolean;
}

const client: Client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_API_URL!)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID!);

const database: Databases = new Databases(client);

export const getHighlighted = async () => {
  return database.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASE_ID!,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID!,
    [Query.equal("isHighlighted", true)]
  );
};

export const getPortfolio = async () => {
  return database.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASE_ID!,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID!,
    [Query.equal("isHighlighted", false)]
  );
};
