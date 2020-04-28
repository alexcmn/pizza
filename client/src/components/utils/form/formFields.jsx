import React from 'react';

const FormField = ({ formdata, change, id }) => {

    const showError = () => {
        let errorMessage = null;

        if (formdata.validation && !formdata.valid) {
            errorMessage = (
                <div className="error_label">
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;

        switch (formdata.element) {
            case ('input'):
                formTemplate = (
                    <>
                        {formdata.showlabel ?
                            <label>{formdata.config.label}</label>
                            : null
                        }
                        <input
                            className="form-control"
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id })}
                        />
                        {showError()}
                    </>
                )
                break;
            case ('textarea'):
                formTemplate = (
                    <>
                        {formdata.showlabel ?
                            <label>{formdata.config.label}</label>
                            : null
                        }
                        <textarea
                            className="form-control"
                            rows="3"
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id })}
                        />
                        {showError()}
                    </>
                )
                break;
            case ('select'):
                formTemplate = (
                    <>
                        {formdata.showlabel ?
                            <label>{formdata.config.label}</label>
                            : null
                        }
                        <select
                            className="form-control"
                            value={formdata.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id })}
                        >
                            <option value="">Select one</option>
                            {
                                formdata.config.options.map(item=>(
                                    <option key={item.key} 
                                            value={item.key}
                                    >
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        {showError()}
                    </>
                )
                break;
            default:
                formTemplate = null;
        }

        return formTemplate;
    }

    return (
        <>
            {renderTemplate()}
        </>
    );
}

export default FormField;