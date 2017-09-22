import React from 'react'
import { Button, Col, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'


export function MyInputGroup({ input,
    label,
    type,
    isHorizontal = false,
    meta: { touched, error, warning } }) {
    return (
        <FormGroup validationState={touched ? ((error && ('error')) || (warning && ('warning'))) : null}>

            {
                //console.log('touched: ' + JSON.stringify(touched))
                //console.log('error: ' + JSON.stringify(error))
                //console.log('warning: ' + JSON.stringify(warning))
            }

            <Col componentClass={ControlLabel} sm={isHorizontal ? 2 : 0}>
                {label}
            </Col>
            <Col sm={isHorizontal ? 10 : 0}>
                <FormControl
                    {...input}
                    type={type}
                    placeholder={label}
                />
                {error && <HelpBlock>{error}</HelpBlock>}
                {warning && <HelpBlock>{warning}</HelpBlock>}
            </Col>
        </FormGroup>
    );
}

export function MySelectGroup({ input,
    label,
    options = [
        { value: 'sample-value', text: 'Sample Text' }
    ],
    isHorizontal = false,
    meta: { touched, error, warning } }) {
    return (
        <FormGroup validationState={touched ? ((error && ('error')) || (warning && ('warning'))) : null}>

            {
                //console.log('touched: ' + JSON.stringify(touched))
                //console.log('error: ' + JSON.stringify(error))
                //console.log('warning: ' + JSON.stringify(warning))
            }
            <Col componentClass={ControlLabel} sm={isHorizontal ? 2 : 0}>
                {label}
            </Col>
            <Col sm={isHorizontal ? 10 : 0}>
                <FormControl
                    {...input}
                    componentClass="select"
                    placeholder={label}
                >
                    <option value="">Please select</option>
                    {options.map(option =>
                        <option key={option.value} value={option.value}>{option.text}</option>)
                    }
                </FormControl>
                {error && <HelpBlock>{error}</HelpBlock>}
                {warning && <HelpBlock>{warning}</HelpBlock>}
            </Col>
        </FormGroup>
    );
}

export function MyTextAreaGroup({ input,
    row = 3,
    label,
    isHorizontal = false,
    meta: { touched, error, warning } }) {
    return (
        <FormGroup validationState={touched ? ((error && ('error')) || (warning && ('warning'))) : null}>

            {
                //console.log('touched: ' + JSON.stringify(touched))
                //console.log('error: ' + JSON.stringify(error))
                //console.log('warning: ' + JSON.stringify(warning))
            }

            <Col componentClass={ControlLabel} sm={isHorizontal ? 2 : 0}>
                {label}
            </Col>
            <Col sm={isHorizontal ? 10 : 0}>
                <FormControl
                    {...input}
                    componentClass="textarea"
                    placeholder={label}
                    rows={row}
                />
                {error && <HelpBlock>{error}</HelpBlock>}
                {warning && <HelpBlock>{warning}</HelpBlock>}
            </Col>
        </FormGroup>
    );
}

export function MySubmitButtonGroup({
    submitting,
    pristine,
    reset,
    submitLable = 'Submit',
    clearLable = 'Clear', }) {
    return (
        <FormGroup className="text-center">

            <Button type="submit" bsStyle="primary" disabled={submitting}>{submitLable}</Button>
            {' '}
            <Button disabled={pristine || submitting} onClick={reset}>{clearLable}</Button>

        </FormGroup>
    );
}