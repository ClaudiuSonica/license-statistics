<template>
  <div class="container">
    <h1>Mamele și Nou-născuții</h1>

    <!-- Listă de mame existente -->
    <div v-if="mame.length" class="lista">
      <h2>Înregistrări existente</h2>
      <ul>
        <li v-for="mama in mame" :key="mama._id">
          <strong>{{ mama.name ?? 'N/A' }}</strong> (vârsta: {{ mama.age ?? '-' }}) - Nou-născut:
          <strong>{{ mama.baby?.name ?? 'N/A' }}</strong> (născut: {{ mama.baby?.birthDate ? new Date(mama.baby.birthDate).toLocaleDateString() : 'N/A' }})
        </li>
      </ul>
    </div>

    <div class="buttons-group">
      <button v-if="mame.length" @click="downloadExcel" class="download-btn">
        Descarcă ca Excel
      </button>

      <!-- Buton pentru afișarea formularului -->
      <button @click="toggleForm" class="toggle-btn">
        {{ showForm ? 'Renunță' : 'Adaugă mamă nouă' }}
      </button>
    </div>

    <!-- Formularul de adăugare -->
    <div v-if="showForm" class="form-container">
      <h2>Adaugă mamă nouă</h2>
      <form @submit.prevent="submitMama">
        <!-- Secțiunea: Date Mama -->
        <fieldset class="section">
          <legend>Date Mama</legend>
          <div class="row">
            <div class="field">
              <label>Nume:</label>
              <input v-model="nouaMama.name" type="text" placeholder="Ex: Maria Popescu" required />
            </div>
            <div class="field">
              <label>Vârstă:</label>
              <input v-model.number="nouaMama.age" type="number" placeholder="Ex: 28" required />
            </div>
            <div class="field">
              <label>Greutate (kg):</label>
              <input v-model.number="nouaMama.weight" type="number" placeholder="Ex: 65" required />
            </div>
            <div class="field">
              <label>Înălțime (cm):</label>
              <input v-model.number="nouaMama.height" type="number" placeholder="Ex: 165" required />
            </div>
            <div class="field">
              <label>Gestatie (săpt.):</label>
              <input v-model.number="nouaMama.gestation" type="number" placeholder="Ex: 38" required />
            </div>
            <div class="field">
              <label>Paritate:</label>
              <input v-model.number="nouaMama.parity" type="number" placeholder="Ex: 1" required />
            </div>
            <div class="field">
              <label>Mediu:</label>
              <select v-model="nouaMama.environment" required>
                <option value="urban">Urban</option>
                <option value="rural">Rural</option>
              </select>
            </div>
            <div class="field">
              <label>Instruire:</label>
              <select v-model="nouaMama.education" required>
                <option value="none">Fără</option>
                <option value="primary">Ciclu primar</option>
                <option value="middle">Gimnazial</option>
                <option value="high">Liceu</option>
                <option value="university">Facultate</option>
              </select>
            </div>
            <div class="field">
              <label>Vârsta internare (săpt.):</label>
              <input v-model.number="nouaMama.pregnancyAgeAtAdmission" type="number" placeholder="Ex: 38" required />
            </div>
            <div class="field">
              <label>Mod. naștere:</label>
              <select v-model="nouaMama.deliveryMode" required>
                <option value="vaginal">Vaginală</option>
                <option value="caesarean">Cezariană</option>
              </select>
            </div>
            <div class="field full">
              <label>Indicații cezariană:</label>
              <input v-model="nouaMama.caesareanIndicationsInput" type="text" placeholder="separați prin virgulă" />
            </div>
            <div class="field full">
              <label>Complicații după naștere:</label>
              <input v-model="nouaMama.postpartumComplicationsInput" type="text" placeholder="separați prin virgulă" />
            </div>
            <div class="field full">
              <fieldset class="subsection">
                <legend>Complicații sarcină</legend>
                <div class="inline-fields">
                  <label>HTA: <input v-model="nouaMama.pregnancyComplications.HTA" type="checkbox" /></label>
                  <label>Diabet: <input v-model="nouaMama.pregnancyComplications.diabetes" type="checkbox" /></label>
                  <label>Hipotiroidie: <input v-model="nouaMama.pregnancyComplications.hypothyroidism" type="checkbox" /></label>
                  <label>IUGR: <input v-model="nouaMama.pregnancyComplications.IUGR" type="checkbox" /></label>
                  <label>Macrosomie: <input v-model="nouaMama.pregnancyComplications.macrosomia" type="checkbox" /></label>
                </div>
              </fieldset>
            </div>
          </div>
        </fieldset>

        <!-- Secțiunea: Date Nou-născut -->
        <fieldset class="section">
          <legend>Date Nou-născut</legend>
          <div class="row">
            <div class="field">
              <label>Nume:</label>
              <input v-model="nouaMama.baby.name" type="text" placeholder="Ex: Ana Popescu" required />
            </div>
            <div class="field">
              <label>Data nașterii:</label>
              <input v-model="nouaMama.baby.birthDate" type="date" required />
            </div>
            <div class="field">
              <label>Greutate (kg):</label>
              <input v-model.number="nouaMama.baby.weight" type="number" step="0.1" placeholder="Ex: 3.2" required />
            </div>
            <div class="field">
              <label>Lungime (cm):</label>
              <input v-model.number="nouaMama.baby.length" type="number" placeholder="Ex: 50" required />
            </div>
            <div class="field">
              <label>Per. cranian (cm):</label>
              <input v-model.number="nouaMama.baby.headCircumference" type="number" placeholder="Ex: 34" required />
            </div>
            <div class="field">
              <label>Per. toracic (cm):</label>
              <input v-model.number="nouaMama.baby.chestCircumference" type="number" placeholder="Ex: 33" required />
            </div>
            <div class="field">
              <label>Vârsta (săpt.):</label>
              <input v-model.number="nouaMama.baby.ageWeeks" type="number" placeholder="Ex: 40" required />
            </div>
            <div class="field">
              <label>Zile internare:</label>
              <input v-model.number="nouaMama.baby.hospitalizationDays" type="number" placeholder="Ex: 3" required />
            </div>
            <div class="field">
              <label>Terapie intensivă:</label>
              <input v-model="nouaMama.baby.intensiveCare" type="checkbox" />
            </div>
            <div class="field">
              <label>Trat. antibiotic:</label>
              <input v-model="nouaMama.baby.antibioticTreatment" type="checkbox" required />
            </div>
            <div class="field">
              <label>Zile antibiotic:</label>
              <input v-model.number="nouaMama.baby.antibioticDays" type="number" placeholder="Ex: 0" />
            </div>
            <div class="field full">
              <label>Complicații:</label>
              <input v-model="nouaMama.baby.complicationsInput" type="text" placeholder="separați prin virgulă" />
            </div>
          </div>
        </fieldset>

        <button type="submit" class="submit-btn">Salvează</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const mame = ref([])
const showForm = ref(false)

const nouaMama = ref({
  name: '',
  age: null,
  weight: null,
  height: null,
  gestation: null,
  parity: null,
  environment: 'urban',
  education: 'high',
  historyPrematureBirth: false,
  pregnancyComplications: {
    HTA: false,
    diabetes: false,
    hypothyroidism: false,
    IUGR: false,
    macrosomia: false
  },
  pregnancyAgeAtAdmission: null,
  deliveryMode: 'vaginal',
  caesareanIndications: [],
  postpartumComplications: [],
  caesareanIndicationsInput: '',
  postpartumComplicationsInput: '',
  baby: {
    name: '',
    birthDate: '',
    weight: null,
    length: null,
    headCircumference: null,
    chestCircumference: null,
    ageWeeks: null,
    hospitalizationDays: null,
    intensiveCare: false,
    antibioticTreatment: false,
    antibioticDays: 0,
    complications: [],
    complicationsInput: ''
  }
})

const fetchMame = async () => {
  try {
    const response = await axios.get('api/mothers')
    mame.value = response.data
  } catch (error) {
    console.error('Eroare la preluarea mamelor:', error)
  }
}

const toggleForm = () => {
  showForm.value = !showForm.value
}

const downloadExcel = () => {
  // Simply change the window location to the Excel endpoint
  window.location.href = 'api/mothers/excel'
}

const processInputList = (input) => {
  return input.split(',').map(item => item.trim()).filter(item => item)
}

const submitMama = async () => {
  nouaMama.value.caesareanIndications = processInputList(nouaMama.value.caesareanIndicationsInput)
  nouaMama.value.postpartumComplications = processInputList(nouaMama.value.postpartumComplicationsInput)
  nouaMama.value.baby.complications = processInputList(nouaMama.value.baby.complicationsInput)
  try {
    const response = await axios.post('api/mothers', nouaMama.value)
    mame.value.push(response.data)
    // Resetare formular
    nouaMama.value = {
      name: '',
      age: null,
      weight: null,
      height: null,
      gestation: null,
      parity: null,
      environment: 'urban',
      education: 'high',
      historyPrematureBirth: false,
      pregnancyComplications: {
        HTA: false,
        diabetes: false,
        hypothyroidism: false,
        IUGR: false,
        macrosomia: false
      },
      pregnancyAgeAtAdmission: null,
      deliveryMode: 'vaginal',
      caesareanIndications: [],
      postpartumComplications: [],
      caesareanIndicationsInput: '',
      postpartumComplicationsInput: '',
      baby: {
        name: '',
        birthDate: '',
        weight: null,
        length: null,
        headCircumference: null,
        chestCircumference: null,
        ageWeeks: null,
        hospitalizationDays: null,
        intensiveCare: false,
        antibioticTreatment: false,
        antibioticDays: 0,
        complications: [],
        complicationsInput: ''
      }
    }
    showForm.value = false
  } catch (error) {
    console.error('Eroare la salvarea mamei:', error)
  }
}

onMounted(() => {
  fetchMame()
})
</script>

<style scoped>
/* Container styling */
.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #fff;
}

/* Headings */
h1, h2, h3, legend {
  text-align: center;
  margin-bottom: 1rem;
}

/* List styling */
.lista {
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #333;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Button styling */
.toggle-btn,
.submit-btn {
  display: inline-block;
  margin: 1rem auto;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  color: #fff;
  transition: background-color 0.3s ease;
}

/* Form container */
.form-container {
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  margin-bottom: 2rem;
}

/* Fieldset sections */
.section {
  border: none;
  margin-bottom: 2rem;
  padding: 0;
}
.section legend {
  font-weight: bold;
  padding: 0.5rem 0;
}

/* Layout for rows and fields */
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}
.field {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
}
.field.full {
  flex: 1 1 100%;
}

/* Labels and inputs */
label {
  margin-bottom: 0.3rem;
  font-weight: 500;
}
input, select {
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}
input:focus, select:focus {
  outline: none;
}

/* Subsection styling */
.subsection {
  border: 1px dashed #aaa;
  border-radius: 4px;
  padding: 1rem;
}
.inline-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.inline-fields label {
  flex: 1;
  display: flex;
  align-items: center;
}

.buttons-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.download-btn {
  display: inline-block;
  margin: 1rem auto;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  color: #fff;
  transition: background-color 0.3s ease;
}
</style>
