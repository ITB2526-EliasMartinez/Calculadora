const PREU_KWH = 0.20;    
const PREU_AIGUA = 0.003; 
const TOTAL_USUARIS = 330;      
const DIES_LECTIUS_MES = 21;    
const MESOS_ESTIU_AC = 4;

// Preus Oficina
const PREU_PAPER = 5.34;
const PREU_MARCADOR = 0.89;
const PREU_BORRADOR = 6.83;
const PREU_RECANVI = 5.60;

// Preus Neteja
const PREU_SAC_IND = 1.51;
const PREU_BOSSA_PET = 1.13;
const PREU_PAPER_WC = 25.67;
const PREU_SECAMANS = 18.25;
const PREU_SABO = 8.50;

function calc() {
    // Inputs bàsics
    let v1 = parseFloat(document.getElementById('v1').value) || 0; 
    let v2 = parseFloat(document.getElementById('v2').value) || 0; 

    // Oficina: Càlcul per unitats
    let uPaper = parseFloat(document.getElementById('v3_paper').value) || 0;
    let uMarcador = parseFloat(document.getElementById('v3_marcadors').value) || 0;
    let uBorrador = parseFloat(document.getElementById('v3_borrador').value) || 0;
    let uRecanvi = parseFloat(document.getElementById('v3_recanvi').value) || 0;

    let despesaOficinaMes = (uPaper * PREU_PAPER) + 
                            (uMarcador * PREU_MARCADOR) + 
                            (uBorrador * PREU_BORRADOR) + 
                            (uRecanvi * PREU_RECANVI);
    
    let costOficinaAnual = despesaOficinaMes * 11; // 11 mesos lectius

    document.getElementById('r5_mes').innerText = despesaOficinaMes.toFixed(2);
    document.getElementById('r5').innerText = costOficinaAnual.toFixed(2);

    // Neteja: Càlcul per unitats
    let uSac = parseFloat(document.getElementById('v4_sac').value) || 0;
    let uBossa = parseFloat(document.getElementById('v4_bossa').value) || 0;
    let uPWC = parseFloat(document.getElementById('v4_pwc').value) || 0;
    let uMecha = parseFloat(document.getElementById('v4_mecha').value) || 0;
    let uSabo = parseFloat(document.getElementById('v4_sabo').value) || 0;

    let despesaNetejaMes = (uSac * PREU_SAC_IND) + 
                           (uBossa * PREU_BOSSA_PET) + 
                           (uPWC * PREU_PAPER_WC) + 
                           (uMecha * PREU_SECAMANS) + 
                           (uSabo * PREU_SABO);
    
    let costNetejaAnual = despesaNetejaMes * 12; // Càlcul sobre 12 mesos

    document.getElementById('r7_mes').innerText = despesaNetejaMes.toFixed(2);
    document.getElementById('r7').innerText = costNetejaAnual.toFixed(2);

    // Consumos base anuales (Llum i Aigua)
    let consumAnualLlum = v1 * 12.15;
    document.getElementById('r1').innerText = consumAnualLlum.toFixed(2);
    document.getElementById('r2').innerText = (v1 * 10.3).toFixed(2);
    
    let consumAnualAigua = v2 * 12.2;
    document.getElementById('r3').innerText = consumAnualAigua.toFixed(2);
    document.getElementById('r4').innerText = (v2 * 10).toFixed(2);

    // --- SIMULADORS D'ESTALVI ---

    // 1. Aire Condicionat
    let acUnitats = parseFloat(document.getElementById('ac-unitats').value) || 0;
    let acPotencia = parseFloat(document.getElementById('ac-potencia').value) || 0;
    let acHores = parseFloat(document.getElementById('ac-hores').value) || 0;
    let tempActual = parseFloat(document.getElementById('inp-temp-actual').value) || 0;
    let tempNou = parseFloat(document.getElementById('inp-temp-nou').value) || 0;
    
    let consumACMesBase = acPotencia * acUnitats * acHores * DIES_LECTIUS_MES;
    let estalviTempMes = consumACMesBase * ((tempNou - tempActual) * 0.07);
    let estalviACAnual = estalviTempMes * MESOS_ESTIU_AC;

    document.getElementById('est-temp').innerText = estalviACAnual.toFixed(1);
    document.getElementById('est-temp-mes').innerText = estalviTempMes.toFixed(1);

    // 2. Solar
    let numPlaques = parseFloat(document.getElementById('inp-plaques').value) || 0;
    let estalviPlaquesAnual = numPlaques * 500; 
    document.getElementById('est-plaques').innerText = estalviPlaquesAnual.toFixed(1);
    document.getElementById('est-plaques-mes').innerText = (estalviPlaquesAnual / 12).toFixed(1);

    // 3. Passadissos
    let numPassadissos = parseFloat(document.getElementById('inp-mov').value) || 0;
    let totalSensors = numPassadissos * 3;
    document.getElementById('total-sensors').value = totalSensors;
    let estalviPassAnual = numPassadissos * 450;
    document.getElementById('est-passadissos').innerText = estalviPassAnual.toFixed(1);
    document.getElementById('est-passadissos-mes').innerText = (estalviPassAnual / 12).toFixed(1);

    // 4. Aules
    let numAulesLlum = parseFloat(document.getElementById('inp-llum').value) || 0;
    let estalviAulesAnual = numAulesLlum * 1100;
    document.getElementById('est-aules').innerText = estalviAulesAnual.toFixed(1);
    document.getElementById('est-aules-mes').innerText = (estalviAulesAnual / 12).toFixed(1);

    // 5. Aigua
    let numAire = parseFloat(document.getElementById('inp-airejadors').value) || 0;
    let estalviAirejadorsMes = (TOTAL_USUARIS * 3 * 0.25 * 21) * 6 * (Math.min(numAire/30, 1));
    document.getElementById('est-airejadors').innerText = (estalviAirejadorsMes * 12).toFixed(0);
    document.getElementById('est-airejadors-mes').innerText = estalviAirejadorsMes.toFixed(1);

    let numFlux = parseFloat(document.getElementById('inp-fluxometres').value) || 0;
    let estalviFluxMes = (numFlux * 9 * 21) * 6.6;
    document.getElementById('est-fluxometres').innerText = (estalviFluxMes * 12).toFixed(0);
    document.getElementById('est-fluxometres-mes').innerText = estalviFluxMes.toFixed(1);

    let numUrinaris = parseFloat(document.getElementById('inp-urinaris').value) || 0;
    let estalviUrinarisMes = (numUrinaris * 9 * 21) * 3; 
    document.getElementById('est-urinaris').innerText = (estalviUrinarisMes * 12).toFixed(0);
    document.getElementById('est-urinaris-mes').innerText = estalviUrinarisMes.toFixed(1);

    // --- TOTALS FINALS ---
    let estalviTotalKWh = estalviACAnual + estalviPlaquesAnual + estalviPassAnual + estalviAulesAnual;
    let estalviTotalAigua = (estalviAirejadorsMes * 12) + (estalviFluxMes * 12) + (estalviUrinarisMes * 12);
    
    let eurLlumActual = consumAnualLlum * PREU_KWH;
    let eurAiguaActual = consumAnualAigua * PREU_AIGUA;

    let totalActual = eurLlumActual + eurAiguaActual + costOficinaAnual + costNetejaAnual;
    let estalviEuros = (estalviTotalKWh * PREU_KWH) + (estalviTotalAigua * PREU_AIGUA);
    let totalMillora = totalActual - estalviEuros;

    // Actualització UI Econòmica
    document.getElementById('eur-llum-actual').innerText = eurLlumActual.toFixed(2);
    document.getElementById('eur-aigua-actual').innerText = eurAiguaActual.toFixed(2);
    document.getElementById('eur-llum-millora').innerText = (eurLlumActual - (estalviTotalKWh * PREU_KWH)).toFixed(2);
    document.getElementById('eur-aigua-millora').innerText = (eurAiguaActual - (estalviTotalAigua * PREU_AIGUA)).toFixed(2);

    document.getElementById('totalActual').innerHTML = totalActual.toFixed(2) + ' <span class="unit">€</span>';
    document.getElementById('totalMillora').innerHTML = totalMillora.toFixed(2) + ' <span class="unit">€</span>';
    document.getElementById('estalvi').innerText = estalviEuros.toFixed(2) + ' €';

    // UI Balances
    const elecMillora = consumAnualLlum - estalviTotalKWh;
    const diffElec = consumAnualLlum - elecMillora; 
    document.getElementById('comp-elec-actual').innerText = consumAnualLlum.toFixed(0) + " kWh";
    document.getElementById('comp-elec-millora').innerText = elecMillora.toFixed(0) + " kWh";
    
    const elElecBalance = document.getElementById('balance-elec');
    elElecBalance.className = "balance-recursos " + (diffElec >= 0 ? "bg-success" : "bg-danger");
    elElecBalance.innerText = (diffElec >= 0 ? "✓ Estalvi: " : "⚠ Extra: ") + Math.abs(diffElec).toFixed(0) + " kWh anuals";

    const aiguaMillora = consumAnualAigua - estalviTotalAigua;
    const diffAigua = consumAnualAigua - aiguaMillora;
    document.getElementById('comp-aigua-actual').innerText = consumAnualAigua.toFixed(0) + " L";
    document.getElementById('comp-aigua-millora').innerText = aiguaMillora.toFixed(0) + " L";

    const elAiguaBalance = document.getElementById('balance-aigua');
    elAiguaBalance.className = "balance-recursos " + (diffAigua >= 0 ? "bg-success" : "bg-danger");
    elAiguaBalance.innerText = (diffAigua >= 0 ? "✓ Estalvi: " : "⚠ Extra: ") + Math.abs(diffAigua).toFixed(0) + " Litres anuals";
}

window.onload = calc;