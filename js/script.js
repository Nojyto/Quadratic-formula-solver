const calculator = Desmos.GraphingCalculator(document.getElementById("calculator"), {keypad:false, expressionsCollapsed:true})
calculator.setExpression({id: "graph1", latex: "y=x^2", color: "#000000"})

const ui = document.getElementById("UI")
function resetUI(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    ui.innerHTML = `<h2 id="factored">a(x - <var>x<sub>1</sub></var>)(x - <var>x<sub>2</sub></var>) = 0</h2>
    <h2><var>D</var>=<var id="B">b<sup>2</sup></var><var id="4AC">-4ac</var>=<var id="D">?</var></h2>
    <section id="awns">
        <h2><var>x<sub>1,2</sub>=</var>  
            <table>
                <tbody>
                    <tr>
                        <td>
                            <var id="-B">-b</var><var id="rD">±√D</var>
                        </td>
                    </tr>
                    <tr>
                        <td class="divider">--------------</td>
                    </tr>
                    <tr>
                        <td>
                            <var id="2A">2a</var>
                        </td>
                    </tr>
                </tbody>
            </table>
        <var id="x">= {<var>x<sub>1</sub> ; <var>x<sub>2</sub>}</var></h2>
        <h2><var>x<sub>v</sub>=</var>  
            <table>
                <tbody>
                    <tr>
                        <td>
                            <var>-b</var>
                        </td>
                    </tr>
                    <tr>
                        <td class="divider">-----</td>
                    </tr>
                    <tr>
                        <td>
                            <var>2a</var>
                        </td>
                    </tr>
                </tbody>
            </table>
        <var id="xv"></var></h2>
        <h2><var>y<sub>v</sub>=</var>  
            <table>
                <tbody>
                    <tr>
                        <td>
                            <var>-b<sup>2</sup></var>
                        </td>
                    </tr>
                    <tr>
                        <td class="divider">-----</td>
                    </tr>
                    <tr>
                        <td>
                            <var>4a</var>
                        </td>
                    </tr>
                </tbody>
            </table>
            <var>+c</var>
        <var id="yv"></var></h2>
    </section>`
}

document.getElementById("resetLog").addEventListener("click", () => {
    resetUI()
    document.getElementById("a").value = ""
    document.getElementById("b").value = ""
    document.getElementById("c").value = ""
})

document.getElementById("compute").addEventListener("click", calculate)

document.addEventListener("keyup", (evt) => {
    resetUI()
    if(evt.key != "Enter") return
    calculate()
})

function calculate(){
    const a = parseFloat(document.getElementById("a").value),
    b = parseFloat(document.getElementById("b").value),
    c = parseFloat(document.getElementById("c").value),
    D = b*b-4*a*c

    if(isNaN(a) || isNaN(b) || isNaN(c)){
        alert("Invalid input!")
        return
    }else if(a === 0 || b === 0  || c === 0 ){
        alert("Invalid quadratic formula!")
        return
    }

    calculator.setExpression({id: "graph1", latex: `y=${a}*x^2+${b}*x+${c}`})
    calculator.focusFirstExpression()

    document.getElementById("B").innerHTML   = b*b
    document.getElementById("4AC").innerHTML = `-4·${a}·${c}`
    document.getElementById("D").innerHTML   = D
    document.getElementById("-B").innerHTML  = -b
    document.getElementById("2A").innerHTML  = 2*a
    document.getElementById("xv").innerHTML  = `=${-b/(2*a)}`
    document.getElementById("yv").innerHTML  = `=${(-(b * b)/(4*a))+c}`

    if(D < 0){
        document.getElementById("factored").innerHTML = ""
        document.getElementById("awns").innerHTML     = "<h2>No rational solutions. (D < 0)</h2>";
    }else if(D == 0){
        const x = -b/2*a
        document.getElementById("factored").innerHTML = `<var>${(a === 1) ? "" : a}(x ${!(x > 0) ? "+" : "-"} ${Math.abs(x)}) <sup>2</sup> = 0</var>`
        document.getElementById("rD").innerHTML       = "±√0"
        document.getElementById("x").innerHTML        = `=${x}`
    }else{
        const x1 = (-b+Math.sqrt(D))/2*a, x2 = (-b-Math.sqrt(D))/2*a

        if(Math.sqrt(D) * Math.sqrt(D) === D){
            document.getElementById("factored").innerHTML = `${(a === 1) ? "" : a}(x ${!(x1 > 0) ? "+" : "-"} ${Math.abs(x1)})(x ${!(x2 > 0) ? "+" : "-"} ${Math.abs(x2)}) = 0`
            document.getElementById("rD").innerHTML       = `±√${Math.sqrt(D)}<sup>2</sup>`
            document.getElementById("x").innerHTML        = `={${x1}; ${x2}}`
        }else{
            document.getElementById("factored").innerHTML = `${(a === 1) ? "" : a}(x - √${D})(x + √${D}) = 0`
            document.getElementById("rD").innerHTML       = `±√${D}`
            document.getElementById("x").innerHTML        = ""
        }
    }
}