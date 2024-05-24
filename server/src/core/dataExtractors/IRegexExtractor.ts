export interface IRegexExtractor<T> {
  extract(text: string): T;
}
