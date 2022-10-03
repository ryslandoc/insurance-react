import React from 'react';
import CalculatorContent from "./components/CalculatorContent";
import CalculateIcon from '@mui/icons-material/Calculate';
import {
    selectAdditional,
    selectEndDate,
    selectInsuranceType,
    selectNumberPerson,
    selectPackage,
    selectStartDate
} from "./data";

function App() {

    return (
        <React.Fragment>
            <div className="wrapper-container">
                <div className="wrapper-calculator">
                    <div className="calculator-header">
                        <h1>Insurance calculator</h1>
                        <CalculateIcon className="calculator-icon"/>
                    </div>
                    <CalculatorContent
                        selectInsuranceType={selectInsuranceType}
                        selectPackage={selectPackage}
                        selectAdditional={selectAdditional}
                        selectNumberPerson={selectNumberPerson}
                        selectStartDate={selectStartDate}
                        selectEndDate={selectEndDate}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default App;
