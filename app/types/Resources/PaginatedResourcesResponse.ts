import { PaginationLink } from "./PaginationLink";

export interface PaginatedResourcesResponse<Resource> {
  data: Array<Resource>;
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    per_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    path: string;
    links?: Array<PaginationLink>;
  };
}
