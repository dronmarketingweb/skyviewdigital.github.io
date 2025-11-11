# 🎨 Instrukcja Zmiany Kolorów Napisów

## 📍 Lokalizacja Elementów na Stronie

### 1. **Film - "Pierwsza Historia"**

**Lokalizacja w HTML:** `/home/user/webapp/index.html` - linia **180-188**

**Jak zmienić kolor tekstu na filmie:**

#### **Opcja A: Bezpośrednio w HTML (inline style)**
```html
<!-- Znajdź w index.html około linii 182: -->
<h3 class="font-serif text-3xl text-white mb-2" 
    style="text-shadow: 2px 2px 8px rgba(0,0,0,0.8); color: #ff0000;">
    Pierwsza historia
</h3>
```

#### **Opcja B: W CSS**
Dodaj w `/home/user/webapp/css/style.css`:
```css
#pierwsza-historia-overlay h3 {
    color: #ff0000 !important;  /* Zmień #ff0000 na swój kolor */
}

#pierwsza-historia-overlay p {
    color: #00ff00 !important;  /* Zmień #00ff00 na swój kolor */
}
```

---

### 2. **FAQ CTA - "Masz inne pytanie?"**

**Lokalizacja w HTML:** `/home/user/webapp/index.html` - linia **1050-1057**

**Jak zmienić:**

#### **Opcja A: W HTML (inline style)**
```html
<!-- Znajdź w index.html około linii 1051: -->
<h3 class="font-serif text-2xl mb-4 text-white" 
    style="color: #ffff00;">
    Masz inne pytanie?
</h3>
```

#### **Opcja B: W CSS**
Dodaj w `css/style.css`:
```css
/* FAQ CTA - nagłówek */
.bg-gradient-to-r.from-charcoal h3 {
    color: #ffff00 !important;
}

/* FAQ CTA - paragraf */
.bg-gradient-to-r.from-charcoal p {
    color: #ffffff !important;
}
```

---

### 3. **Przycisk "Poprzedni" w sekcji Nasza Podróż**

**Lokalizacja w HTML:** `/home/user/webapp/index.html` - linia **501-504**

**Jak zmienić:**

#### **W HTML:**
```html
<button id="prev-step" class="flex items-center px-6 py-3 bg-white rounded-lg">
    <i class="fas fa-arrow-left mr-2" style="color: #ff0000;"></i>
    <span class="font-space" style="color: #ff0000;">Poprzedni</span>
</button>
```

#### **W CSS:**
```css
#prev-step {
    color: #ff0000 !important;
}

#prev-step i,
#prev-step span {
    color: #ff0000 !important;
}
```

---

### 4. **Nagłówki Sekcji**

**Jak zmienić kolory głównych nagłówków:**

#### **Demo - "EFEKT WOW W 60 SEKUND"**
Linia: ~157-159 w `index.html`

```html
<h2 class="font-poppins font-bold text-4xl md:text-5xl mb-4" 
    style="color: #8b5a8c;">
    EFEKT WOW W 60 SEKUND
</h2>
```

#### **Philosophy - "Dlaczego inaczej?"**
Linia: ~206-208 w `index.html`

```html
<h2 class="font-serif text-5xl md:text-6xl mb-8" 
    style="color: #2a2e35;">
    Dlaczego <span style="color: #8b5a8c;">inaczej</span>?
</h2>
```

---

## 🎨 **Dostępne Kolory w Projekcie**

### **Kolory zdefiniowane w Tailwind Config:**

```javascript
// W index.html linia ~64-80
colors: {
    primary: '#8b5a8c',      // Śliwkowy fiolet (akcent główny)
    accent: '#8b5a8c',       // To samo co primary
    charcoal: '#2a2e35',     // Ciemny antracyt (tekst główny)
    'warm-gray': '#6b7280',  // Szary kamień (tekst drugoplanowy)
    sand: '#d4c5b9',         // Piaskowy beż
    cream: '#faf8f5',        // Kremowa biel
    ivory: '#ffffff',        // Czysta biel
    sage: '#8b5a8c',         // To samo co primary
    'sage-dark': '#6d4569',  // Ciemniejszy fiolet
    terra: '#d4a574'         // Karmelowy brąz (akcent dodatkowy)
}
```

### **Jak używać tych kolorów:**

#### **W HTML (Tailwind classes):**
```html
<h3 class="text-primary">Fioletowy tekst</h3>
<p class="text-charcoal">Ciemny tekst</p>
<span class="text-terra">Karmelowy tekst</span>
<div class="text-warm-gray">Szary tekst</div>
```

#### **W CSS:**
```css
h3 {
    color: var(--sage);      /* Fioletowy */
    color: var(--charcoal);  /* Ciemny */
    color: var(--terra);     /* Karmelowy */
    color: var(--warm-gray); /* Szary */
}
```

#### **W HTML (inline style):**
```html
<h3 style="color: #8b5a8c;">Fioletowy</h3>
<h3 style="color: #2a2e35;">Ciemny</h3>
<h3 style="color: #d4a574;">Karmelowy</h3>
```

---

## 🔧 **Narzędzia do Wyboru Kolorów**

### **1. Color Picker Online:**
- https://htmlcolorcodes.com/color-picker/
- https://colorhunt.co/ (palety gotowe)
- https://coolors.co/ (generator palet)

### **2. Chrome DevTools:**
1. Kliknij prawym na element
2. "Inspect" (Zbadaj)
3. W panelu "Styles" kliknij na kwadracik koloru
4. Wybierz nowy kolor
5. Skopiuj kod hex (np. #ff0000)

---

## 📝 **Workflow Zmiany Kolorów**

### **Krok 1: Znajdź Element**
Otwórz DevTools (F12) → kliknij na element → sprawdź ID lub klasę

### **Krok 2: Wybierz Metodę**
- **Szybka zmiana 1 elementu?** → Inline style w HTML
- **Zmiana wielu elementów?** → CSS
- **Chcesz używać Tailwind?** → Klasy w HTML

### **Krok 3: Zastosuj Zmianę**

#### **Dla inline style (w HTML):**
1. Otwórz `/home/user/webapp/index.html`
2. Znajdź element (Ctrl+F aby szukać)
3. Dodaj/zmień: `style="color: #TWÓJ_KOLOR;"`
4. Zapisz (Ctrl+S)
5. Odśwież stronę (Ctrl+Shift+R)

#### **Dla CSS:**
1. Otwórz `/home/user/webapp/css/style.css`
2. Na końcu pliku dodaj:
```css
/* Moje zmiany kolorów */
#ID_ELEMENTU {
    color: #TWÓJ_KOLOR !important;
}
```
3. Zapisz (Ctrl+S)
4. Odśwież stronę (Ctrl+Shift+R)

---

## ⚠️ **Ważne Zasady**

### **1. Używaj !important gdy potrzeba:**
```css
/* Bez !important - może nie zadziałać */
h3 {
    color: #ff0000;
}

/* Z !important - zawsze zadziała */
h3 {
    color: #ff0000 !important;
}
```

### **2. Kontrast to klucz:**
- **Ciemny tekst** → na jasnym tle
- **Jasny tekst** → na ciemnym tle

**Sprawdź kontrast:**
- https://webaim.org/resources/contrastchecker/
- Minimum: 4.5:1 dla tekstu normalnego
- Minimum: 3:1 dla dużego tekstu

### **3. Zachowaj spójność:**
Używaj kolorów z palety projektu:
- `#8b5a8c` - Primary (fiolet)
- `#2a2e35` - Charcoal (ciemny)
- `#d4a574` - Terra (karmel)
- `#ffffff` - Biały

---

## 🎯 **Przykłady Praktyczne**

### **Przykład 1: Zmień kolor wszystkich nagłówków w sekcji FAQ**
```css
/* W css/style.css */
#faq h2,
#faq h3 {
    color: #ff0000 !important;  /* Czerwony */
}
```

### **Przykład 2: Zmień kolor opisu na filmie**
```html
<!-- W index.html około linii 183 -->
<p class="text-white mb-4 font-space" 
   style="text-shadow: 1px 1px 4px rgba(0,0,0,0.8); color: #ffff00;">
    Każdy projekt zaczyna się od słuchania. Dopiero potem latamy.
</p>
```

### **Przykład 3: Zmień wszystkie przyciski na zielone**
```css
/* W css/style.css */
button {
    background: #00ff00 !important;  /* Zielone tło */
    color: #000000 !important;       /* Czarny tekst */
}
```

---

## 🆘 **Troubleshooting**

### **Problem: Zmiana koloru nie działa**

**Rozwiązanie 1: Dodaj !important**
```css
color: #ff0000 !important;
```

**Rozwiązanie 2: Użyj bardziej specyficznego selektora**
```css
/* Zamiast: */
h3 { color: #ff0000; }

/* Użyj: */
#pierwsza-historia-overlay h3.font-serif { 
    color: #ff0000 !important; 
}
```

**Rozwiązanie 3: Wyczyść cache**
- Ctrl + Shift + R (Chrome/Edge)
- Cmd + Shift + R (Mac)

### **Problem: Kolor jest, ale słabo widoczny**

**Rozwiązanie: Dodaj text-shadow**
```css
color: #ffffff !important;
text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
```

---

## 📚 **Dalsze Zasoby**

- **Tailwind CSS Docs:** https://tailwindcss.com/docs/text-color
- **CSS Color Picker:** https://htmlcolorcodes.com/
- **Kontrast Checker:** https://webaim.org/resources/contrastchecker/
- **Palety Kolorów:** https://coolors.co/

---

**Ostatnia aktualizacja:** 2024
**Wersja dokumentu:** 1.0
