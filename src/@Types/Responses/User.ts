export interface IUser {
  country: string;
  display_name: string;
  explicit_content: Explicitcontent;
  external_urls: Externalurls;
  followers: Followers;
  href: string;
  id: string;
  images: any[];
  product: string;
  type: string;
  uri: string;
}

interface Followers {
  href?: any;
  total: number;
}

interface Externalurls {
  spotify: string;
}

interface Explicitcontent {
  filter_enabled: boolean;
  filter_locked: boolean;
}
