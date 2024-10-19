let dispString = "0";

function handleButtonClick(event) {
    const button = event.target;
    if (button.classList.contains("cal") || button.classList.contains("clr")) {
        return;
    }
    const number = button.textContent;
    return new Promise((resolve) => {
        resolve(number);
    }).then(type);
}

function handleCalculation() {
    return new Promise((resolve, reject) => {
        try {
            let ans = eval(dispString);
            resolve(ans);
        } catch (error) {
            reject('Error in calculation');
        }
    }).then((ans) => {
        dispString = ans.toString();
        document.querySelector("h5").textContent = ans;
    }).catch((err) => {
        console.error(err);
    });
}

function handleClear() {
    return new Promise((resolve) => {
        dispString = "0";
        document.querySelector("h5").textContent = dispString;
        resolve();
    });
}

function type(number) {
    return new Promise((resolve) => {
        if (dispString === '0') {
            dispString = number;
        } else {
            dispString += number;
        }
        document.querySelector("h5").textContent = dispString;
        resolve();
    });
}

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", (event) => {
        handleButtonClick(event);
    });
});

document.querySelector(".cal").addEventListener("click", () => {
    handleCalculation();
});

document.querySelector(".clr").addEventListener("click", () => {
    handleClear();
});

document.addEventListener("keypress", function(event) { 
    new Promise((resolve) => {
        if (event.which >= 40 && event.which <= 57 && event.which !== 46 && event.which !== 44) {
            let number = String.fromCharCode(event.which);
            resolve(number);
        } else if (event.which === 13) {
            resolve();
        }
    }).then((number) => {
        if (number) {
            type(number);
        } else {
            handleCalculation();
        }
    });
});
