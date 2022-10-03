import React, {useState} from "react";
import s from "./CalculatorContent.module.scss";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Alert, Button, Input, Snackbar, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers-pro";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function CalculatorContent({
                               selectPackage,
                               selectAdditional,
                               selectInsuranceType,
                               selectEndDate,
                               selectStartDate,
                               selectNumberPerson,
                           }) {

    const [resulCalc, setCount] = useState('');
    const [isError, setIsError] = useState(false);
    const [changeRequired, setChangeRequired] = useState(false);

    const [insuranceType, setInsuranceType] = useState();
    const [packageType, setPackageType] = useState();
    const [additional, setAdditional] = useState();
    const [numberPerson, setNumberPerson] = useState();
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);

    const handleInsurance = (event) => {
        setInsuranceType(event.target.value);
        setIsError(false);
    }
    const handlePackage = (event) => {
        setPackageType(event.target.value);
        setIsError(false);
    }
    const handleAdditional = (event) => {
        setAdditional(event.target.value);
    }
    const handlePerson = (event) => {
        setNumberPerson(event.target.value);
        setIsError(false);
    }

    const errorBlock = () => {
        return <Snackbar open={isError} autoHideDuration={3000} onClose={() => setIsError(false)}>
            <Alert variant="filled" severity="warning" className={s.alertBlock}>
                Choose all required fields
            </Alert>
        </Snackbar>
    }

    const arrOfValues = {
        selectedInsurance: insuranceType,
        selectedPackage: packageType,
        selectedAdditional: additional,
        selectedNumberPerson: numberPerson,
        selectedStartDate: startDate,
        selectedEndDate: endDate,
    }

    const calculateFunction = (value) => {
        const {
            selectedInsurance,
            selectedPackage,
            selectedAdditional,
            selectedNumberPerson,
            selectedStartDate,
            selectedEndDate
        } = value;

        if (selectedInsurance === undefined || selectedPackage === undefined || selectedNumberPerson === undefined || selectedStartDate === undefined) {
            setIsError(true);
        } else {
            if (selectedInsurance === 'annual') {
                const basicPackage = 39;
                const extendPackage = 49;
                const extraPackage = 59;
                let addCharge;
                let priceOfOption;

                if (selectedPackage === 'basic') {
                    priceOfOption = basicPackage;
                } else if (selectedPackage === 'extend') {
                    priceOfOption = extendPackage;
                } else if (selectedPackage === 'extra') {
                    priceOfOption = extraPackage;
                }

                if (selectedAdditional === 'sport') {
                    let percentSport = 10;
                    addCharge = (priceOfOption / 100) * percentSport;
                } else if (selectedAdditional === 'cancellation') {
                    let percentCancellation = 20;
                    addCharge = (priceOfOption / 100) * percentCancellation;
                }

                return ((((priceOfOption ? priceOfOption : 1) + (addCharge ? addCharge : 0)) * (selectedNumberPerson ? selectedNumberPerson : 1)) + ' €');
            }

            if (selectedInsurance === 'short') {
                if (selectedEndDate === undefined) {
                    setIsError(true);
                } else {
                    const basicPackage = 1.2;
                    const extendPackage = 1.8;
                    const extraPackage = 2.4;
                    let addCharge;
                    let priceOfOption;

                    const getDate = () => {
                        const diffHours = Math.ceil((selectedEndDate - selectedStartDate) / 36e5);
                        return Math.floor(diffHours / 24);
                    }

                    if (selectedPackage === 'basic') {
                        priceOfOption = basicPackage;
                    } else if (selectedPackage === 'extend') {
                        priceOfOption = extendPackage;
                    } else if (selectedPackage === 'extra') {
                        priceOfOption = extraPackage;
                    }

                    if (selectedAdditional === 'sport') {
                        let percentSport = 30;
                        addCharge = (priceOfOption / 100) * percentSport;
                    } else if (selectedAdditional === 'cancellation') {
                        let percentCancellation = 50;
                        addCharge = (priceOfOption / 100) * percentCancellation;
                    }

                    return (Math.round((((priceOfOption ? priceOfOption : 1) + (addCharge ? addCharge : 0) * (getDate())) * (selectedNumberPerson ? selectedNumberPerson : 1)) * 100) / 100 + ' €');
                }
            }
        }
    }

    return (
        <React.Fragment>
            <div className="errorBlock">{isError && errorBlock()}</div>
            <div className={s.calculatorBody}>
                <div className={s.section}>

                    <FormControl required className={s.form} error={isError}>
                        <InputLabel id="demo-simple-select-required-label">{selectInsuranceType.label}</InputLabel>
                        <Select
                            defaultValue=""
                            labelId="demo-simple-select-required-label"
                            id={selectInsuranceType.id.toString()}
                            label={selectInsuranceType.label + '*'}
                            value={insuranceType || ''}
                            onChange={handleInsurance}
                        >
                            {selectInsuranceType.options.map((item, index) => {
                                return <MenuItem
                                    key={index}
                                    value={item.value}
                                    onClick={() => {
                                        item.value === 'short' ? setChangeRequired(true) : setChangeRequired(false)
                                    }}>{item.label}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl required className={s.form} error={isError}>
                        <InputLabel id="demo-simple-select-required-label">{selectPackage.label}</InputLabel>
                        <Select
                            defaultValue=""
                            labelId="demo-simple-select-required-label"
                            id={selectPackage.id.toString()}
                            label={selectPackage.label + '*'}
                            value={packageType || ''}
                            onChange={handlePackage}
                        >
                            {selectPackage.options.map((item, index) => {
                                return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className={s.section}>
                    <FormControl className={s.form}>
                        <InputLabel id="demo-simple-select-label">{selectAdditional.label + '?'}</InputLabel>
                        <Select
                            defaultValue=""
                            labelId="demo-simple-select-label"
                            id={selectAdditional.id.toString()}
                            label={selectAdditional.label}
                            value={additional || ''}
                            onChange={handleAdditional}
                        >
                            {selectAdditional.options.map((item, index) => {
                                return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl required className={s.form} error={isError}>
                        <InputLabel id="demo-simple-select-required-label">{selectNumberPerson.label}</InputLabel>
                        <Select
                            defaultValue=""
                            labelId="demo-simple-select-required-label"
                            id={selectNumberPerson.id.toString()}
                            label={selectNumberPerson.label + '*'}
                            value={numberPerson || ''}
                            onChange={handlePerson}
                        >
                            {selectNumberPerson.options.map((item, index) => {
                                return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                </div>
                <div className={s.section}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <div className={s.dateWrapper}>
                            <DatePicker
                                error={isError}
                                id={selectStartDate.id.toString()}
                                value={startDate || null}
                                label={selectStartDate.label}
                                views={['year', 'month', 'day']}
                                onChange={(event) => {
                                    setStartDate(event);
                                }}
                                renderInput={(params) => <TextField {...params} error={isError}/>}
                            />
                        </div>

                        <div className={s.dateWrapper}>
                            <DatePicker
                                id={selectEndDate.id.toString()}
                                value={endDate || null}
                                label={selectEndDate.label}
                                views={['year', 'month', 'day']}
                                onChange={(event) => {
                                    setEndDate(event);
                                }}
                                renderInput={(params) => <TextField {...params} error={changeRequired && isError}/>}
                            />
                        </div>

                    </LocalizationProvider>
                </div>
            </div>
            <div className="calculator-footer">
                <Input className="calculator-text"
                       value={resulCalc ? resulCalc : 'Choose all required fields'}
                       disabled/>
                <Button className="calculator-btn" variant="outlined"
                        onClick={() => setCount(calculateFunction(arrOfValues))}>
                    Calc
                    {errorBlock()}
                </Button>
            </div>
        </React.Fragment>
    );
}

export default CalculatorContent;
