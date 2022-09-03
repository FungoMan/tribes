export type Ilisting = { [key: string]: any };

export type IOption = {
  label: string | JSX.Element;
  value: string;
  id?: string;
};

export interface IReviewData {
  id?: string | number;
  content?: string;
  rating?: number;
  images?: string[];
  reply_reviews?: string;
  date_create_reply?: Date | any;
  user?: any;
  visited_date?: Date | any;
  reply_accepted?: boolean;
}
