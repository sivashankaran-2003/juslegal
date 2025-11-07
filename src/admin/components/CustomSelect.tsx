import { FieldProps } from "formik";
import React from "react";
import Select, {} from "react-select";
//@ts-ignore
import { OptionsType, ValueType } from "@types/react-select";

interface Option {
  label: string;
  value: string;
}

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  reset,
  content,
  isMulti = false
}) => {
  const onChange = (option: ValueType<Option | Option[]>) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
    reset(content)
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  const formatOptionLabel = (option: Option) => {
    //get the name and the address from the value JSON
    const { value } = option;
    //@ts-ignore
    const { name, address } = value;
    return(
      <div className="flex flex-col justify-center items-start">
        <div className="font-medium">{name}</div>
        <div className="text-slate-600 font-light">{address}</div>
      </div>
    )
  }

  // If there are no options to show that
  if (options.length === 0) {
    return <div className={className}>No saved names in the main template...</div>;
  }

  return (
    <Select
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      formatOptionLabel={formatOptionLabel}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
    />
  );
};

export default CustomSelect;
