export function useComment(): any {
  const scrollToComment = (commentId: number): void => {
    document
      .getElementById("comment-" + commentId)
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return {
    scrollToComment,
  };
}
