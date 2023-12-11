import { useForm, Controller, SubmitHandler, } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { SchoolModel } from './types/schoolModel'
import FormFieldWithLabel from '../../shared/components/FormFieldWithLabel/FormFieldWithLabel'
import { TextField } from '../../shared/components/TextField/TextField'
import { Button } from 'primereact/button'

interface AddAndEditSchoolProps {
    school?: SchoolModel
    isNew: boolean
}
const AddAndEditSchool: React.FC<AddAndEditSchoolProps> = (props) => {
    const { control, handleSubmit, reset, setValue, formState: { errors: schoolErrors, isSubmitted, isValid, isDirty, isSubmitSuccessful, isSubmitting }, setError, clearErrors } = useForm<SchoolModel>({
        mode: 'onBlur',
    });

    const submitForm: SubmitHandler<SchoolModel> = (school: SchoolModel) => {
        console.log(school)
    }
    useEffect(() => {
        if (props?.school) {
            setValue('type', props.school.type)
            reset(props.school)
        }
    }
    ,[props.school, reset, setValue])
    return (
        <>
            <div className="col-12">
                <div className="card">
                    <h5>New School</h5>

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
                                    showOptionalText={false}
                                    formField={
                                        <TextField placeholder="eg. Zalando" dataAttribute='brand_name' errorMessage={schoolErrors?.type?.message} value={field?.value} onChange={field.onChange} />} />
                            )}
                        />
                    </div>
                    <div className="gap-2">
                        <Button label={`${props?.isNew?"Update":"Save"}`} onClick={handleSubmit(submitForm)} icon="pi pi-check" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddAndEditSchool