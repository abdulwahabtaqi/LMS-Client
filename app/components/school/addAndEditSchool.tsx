import { useForm, Controller, SubmitHandler, } from 'react-hook-form'
import React from 'react'
import { SchoolModel } from './types/schoolModel'
import FormFieldWithLabel from '../../shared/components/FormFieldWithLabel/FormFieldWithLabel'
import { TextField } from '../../shared/components/TextField/TextField'

const AddAndEditSchool = () => {
    const { control, handleSubmit, reset, setValue, formState: { errors: brandErrors, isSubmitted, isValid, isDirty, isSubmitSuccessful, isSubmitting }, setError, clearErrors } = useForm<SchoolModel>({
        mode: 'onBlur',
    });
    return (
        <>
            <div className="col-12">
                <div className="card">
                    <h5>Advanced</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <Controller
                                name='type'
                                control={control}
                                defaultValue=""
                                rules={{ required: "School type is required", maxLength: 10, minLength: 2, pattern: /^[A-Za-z]+$/i, }}
                                render={({ field }) => (
                                    <FormFieldWithLabel
                                        label="School Type"
                                        showCharLimit={false}
                                        showOptionalText={true}
                                        formField={
                                            <TextField placeholder="eg. secondary" value={field?.value ?? ""} onChange={field.onChange} dataAttribute='school_type' />} />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddAndEditSchool