export type RetrievalQuery = {
  text: string;
  metadata?: Record<string, unknown>;
};

export type Evidence = {
  content: string;
  metadata?: Record<string, unknown>;
  source: {
    type: string;
    label?: string;
  };
};

export type RetrievalResult = {
  evidence: Evidence[];
};

export interface Retriever {
  retrieve(query: RetrievalQuery): Promise<RetrievalResult>;
}
