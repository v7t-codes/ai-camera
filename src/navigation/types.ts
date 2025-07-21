import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AppStackParamList = {
  Camera: undefined;
  Gallery: undefined;
};

export type AppScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>; 