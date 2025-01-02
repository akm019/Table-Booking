export const Card = ({ children, className, ...props }) => {
    return (
      <div className={`bg-white rounded-lg shadow p-6 ${className}`} {...props}>
        {children}
      </div>
    );
  };
  
  export const CardHeader = ({ children, className, ...props }) => {
    return <div className={`mb-4 ${className}`} {...props}>{children}</div>;
  };
  
  export const CardTitle = ({ children, className, ...props }) => {
    return <h2 className={`text-xl font-bold ${className}`} {...props}>{children}</h2>;
  };
  
  export const CardContent = ({ children, className, ...props }) => {
    return <div className={className} {...props}>{children}</div>;
  };