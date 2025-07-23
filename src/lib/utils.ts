// 여러 클래스명을 조건에 따라 병합해주는 함수입니다.
export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}
