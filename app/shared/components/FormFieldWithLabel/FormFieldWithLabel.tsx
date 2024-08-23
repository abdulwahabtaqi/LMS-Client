import React from 'react'
import './FormFieldWIthLabel.scss';
interface FormFieldWithLabelProps {
  label: string;
  formField: React.ReactNode;
  showCharLimit?: boolean;
  maxChar?: number;
  showOptionalText?: boolean;
  charCount?: number
}
const FormFieldWithLabel: React.FC<FormFieldWithLabelProps> = ({ label, formField, showCharLimit, maxChar, showOptionalText, charCount })  => {
  return (
    <>
      <div className={`field`}>
        <div className="flex justify-content-between">
          <label>
           <b> {label}</b>
            {showOptionalText ? <span className={`optionalText`}>{`optional`}</span> : null}
          </label>
          {showCharLimit ? <span className={`charCounter`}>{charCount} / {maxChar}</span> : null}
        </div>
        {formField}
      </div >
    </>
  )
}

export default FormFieldWithLabel