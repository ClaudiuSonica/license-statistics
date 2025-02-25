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

    <!-- Buton pentru afișarea formularului -->
    <button @click="toggleForm" class="toggle-btn">
      {{ showForm ? 'Renunță' : 'Adaugă mamă nouă' }}
    </button>

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
    console.log(response.data)
    mame.value = response.data
  } catch (error) {
    console.error('Eroare la preluarea mamelor:', error)
  }
}

const toggleForm = () => {
  showForm.value = !showForm.value
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
/* Almost full-width container */
.container {
  width: 95%;
  margin: 0 auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

/* Center headings */
h1, h2, h3, legend {
  text-align: center;
}

.lista {
  margin-bottom: 1rem;
}

.toggle-btn,
.submit-btn {
  display: block;
  margin: 1rem auto;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
}

/* Form container with border */
.form-container {
  border: 1px solid #ccc;
  padding: 1rem;
}

/* Fieldset sections */
.section {
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  padding: 1rem;
}

/* Each row is a flex container that wraps */
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Each field: inline, with a minimum width */
.field {
  flex: 1 1 200px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* For full-width fields */
.field.full {
  flex-basis: 100%;
}

/* Inline labels and inputs */
label {
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  width: 100%;
}

input, select {
  padding: 0.4rem;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

/* Subsection styling */
.subsection {
  width: 100%;
  border: 1px dashed #aaa;
  padding: 0.5rem;
}
.inline-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
