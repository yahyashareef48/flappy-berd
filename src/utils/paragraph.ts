export function paragraph(text: string) {
  const p = document.createElement("p");
  p.textContent = text;
  p.setAttribute("class", "text");
  return p;
}
