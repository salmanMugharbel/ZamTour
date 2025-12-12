export interface Destination {
  id: string;
  name: string;
  cat: string;
  rating: number;
  reviews: number;
  img: string;
}

export interface Tip {
  icon: string;
  title: string;
  text: string;
}

export interface PackageFeature {
  icon: string;
  text: string;
}

export interface PackageTier {
  name: string;
  title: string;
  features: PackageFeature[];
  price: number;
  unit: string;
  isPremium: boolean;
  buttonColor: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}