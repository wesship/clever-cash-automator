
export const updateMetadata = (title: string, description?: string) => {
  document.title = `${title} | Clever Cash Automator`;
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description || 'Automate your financial tasks efficiently');
  }
};
