const Input = ({ className, ...props }) => {
    return (
      <input
        className={`w-full p-2 border rounded-md ${className}`}
        {...props}
      />
    );
  };
  
  export { Input };