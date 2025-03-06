import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputField = ({
  type,
  placeholder,
  disabled,
  password,
  label,
  error,
  register,
}) => {
  const [passwordType, setPasswordType] = useState(type);
  const passwordToggle = () => {
    if (passwordType === 'text') {
      return (
        <FaEye
          className="text-gray-400 h-5 w-5 mx-2 cursor-pointer"
          onClick={() => setPasswordType('password')}
        />
      );
    } else if (passwordType === 'password') {
      return (
        <FaEyeSlash
          className="text-gray-400 h-5 w-5 mx-2 cursor-pointer"
          onClick={() => setPasswordType('text')}
        />
      );
    } else return null;
  };

  return (
    <div className="grid gap-1">
      <p className="text-gray-800 font-medium">{label}</p>
      <div className="grid gap-1">
        <div
          className={
            error
              ? 'relative flex items-center bg-gray-50 border border-red-600 rounded-lg mb-4'
              : 'relative flex items-center bg-gray-50 border border-amber-400 rounded-lg mb-4'
          }
        >
          <input
            className="w-full p-3 outline-none bg-inherit rounded-lg"
            type={passwordType}
            placeholder={placeholder}
            {...register}
            disabled={disabled}
          />
          {password && passwordToggle()}
        </div>
      </div>
    </div>
  );
};

export default InputField;
