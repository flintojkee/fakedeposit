export interface BankRate {
  id: number;
  meta: Meta;
  title: string;
  bank_name: string;
  deposit_name: string;
  income: boolean;
  dolar: number;
  euro: number;
  hryvna: number;
  capitalization: number;
  bank_image: string;
  body: HTMLElement;
  page_description: string;
  deposit_path: string;
}
export interface BankRatesResponse {
  meta: {
    total_count: number;
  };
  items: BankRate[];
}
interface Meta {
  type: string;
  detail_url: string;
  html_url: string;
  slug: string;
  show_in_menus: boolean;
  seo_title: string;
  search_description: string;
  first_published_at: Date;
}
