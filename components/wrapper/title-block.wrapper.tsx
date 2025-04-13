const TitleBlockWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-10 sm:px-5 lg:py-10 md:px-0 flex flex-row">
      {children}
    </div>
  );
};

export default TitleBlockWrapper;
