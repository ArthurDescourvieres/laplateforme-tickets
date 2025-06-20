# 🎉 Projet React Native avec Expo et NativeWind

Un projet simple démontrant l'intégration d'**Expo**, **React Native** et **NativeWind** (Tailwind CSS pour React Native).

## 🚀 Fonctionnalités

- ✅ **Expo SDK 53** - Dernière version d'Expo
- ✅ **NativeWind** - Tailwind CSS pour React Native
- ✅ **TypeScript** - Support complet TypeScript
- ✅ **Mode sombre/clair** - Changement de thème dynamique
- ✅ **Hot Reload** - Rechargement instantané pendant le développement
- ✅ **Support multiplateforme** - iOS, Android et Web

## 📦 Installation

Les dépendances sont déjà installées ! Le projet est prêt à être utilisé.

### Dépendances principales
- `expo` - Framework React Native
- `nativewind` - Styling avec Tailwind CSS
- `react-native-reanimated` - Animations
- `react-native-safe-area-context` - Gestion des zones sécurisées

## 🎯 Démarrage rapide

### Pour iOS :
```bash
npm run ios
```

### Pour Android :
```bash
npm run android
```

### Pour le Web :
```bash
npm run web
```

### Développement général :
```bash
npm start
```

## 📱 Fonctionnalités de l'app

L'application de démonstration inclut :

1. **Écran d'intro animé** - 8 cubes blancs translucides avec animations fluides sur fond bleu
2. **Compteur interactif** - Boutons pour incrémenter/décrémenter
3. **Changement de thème** - Basculer entre mode clair et sombre
4. **Interface moderne** - Design avec des cartes et des ombres
5. **Mode test intro** - Bouton pour revoir l'animation d'intro
6. **Responsive** - S'adapte à toutes les tailles d'écran

## 🌀 Écran d'intro avec animations

L'application commence par un écran d'intro élégant qui présente :

### 🎯 Spécifications techniques
- **Fond bleu** : `#0062FF` en plein écran
- **Logo** : Centré à ~60% de la hauteur de l'écran
- **8 cubes animés** : Blancs translucides avec mouvements fluides
- **Durée** : 4 secondes (configurable)

### 🧊 Configuration des cubes (style moderne et subtil)
| Cube | Taille | Opacité | Position | Animation | Délai |
|------|--------|---------|-----------|-----------|-------|
| 1 | 8x8px | 0.08 | 12%, 18% | Respiration Y | 0ms |
| 2 | 6x6px | 0.05 | 78%, 12% | Flottement X | 400ms |
| 3 | 11x11px | 0.09 | 10%, 84% | Respiration X | 800ms |
| 4 | 14x14px | 0.12 | 85%, 78% | Flottement Y | 1200ms |
| 5 | 7x7px | 0.06 | 25%, 8% | Respiration Y | 600ms |
| 6 | 9x9px | 0.07 | 88%, 25% | Flottement X | 1000ms |
| 7 | 12x12px | 0.10 | 5%, 35% | Respiration X | 200ms |
| 8 | 10x10px | 0.08 | 92%, 88% | Flottement Y | 1400ms |

### 🔧 Animations subtiles type "respiration digitale"
- **Tailles** : Variables entre 6-14px pour donner de la profondeur
- **Opacités** : Entre 0.05-0.12 pour un effet très léger
- **Mouvements** : ±6 à 10px en translation douce
- **Durée** : 4-6 secondes avec variations aléatoires
- **Easing** : `ease-in-out` pour des mouvements naturels
- **Positionnement** : Asymétrique, évite la zone du logo
- **Style** : Coins nets, aucun effet visuel (pas de glow/ombre)

## 🎨 Utilisation de NativeWind

NativeWind permet d'utiliser les classes Tailwind CSS directement sur les composants React Native :

```tsx
<View className="flex-1 bg-gray-50 px-4">
  <Text className="text-3xl font-bold text-gray-900">
    Hello NativeWind!
  </Text>
  <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-lg">
    <Text className="text-white font-semibold">Bouton</Text>
  </TouchableOpacity>
</View>
```

## 📁 Structure du projet

```
├── App.tsx                 # Composant principal
├── global.css             # Styles Tailwind globaux
├── components/            # Composants réutilisables
├── assets/               # Images et ressources
├── babel.config.js       # Configuration Babel + NativeWind
├── tailwind.config.js    # Configuration Tailwind
├── metro.config.js       # Configuration Metro + NativeWind
└── package.json          # Dépendances et scripts
```

## 🛠️ Configuration

Le projet est pré-configuré avec :

### Babel (`babel.config.js`)
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }], 
      'nativewind/babel'
    ],
  };
};
```

### Metro (`metro.config.js`)
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
```

### Tailwind (`tailwind.config.js`)
```javascript
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 🔧 Scripts disponibles

- `npm start` - Démarre le serveur de développement
- `npm run ios` - Lance sur simulateur iOS
- `npm run android` - Lance sur émulateur Android
- `npm run web` - Lance la version web
- `npm run lint` - Vérifie le code avec ESLint
- `npm run format` - Formate le code avec Prettier

## 📚 Ressources utiles

- [Documentation Expo](https://docs.expo.dev/)
- [Documentation NativeWind](https://www.nativewind.dev/)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation React Native](https://reactnative.dev/docs)

## 🎓 Prochaines étapes

Voici quelques idées pour étendre ce projet :

1. **Navigation** - Ajouter React Navigation
2. **State Management** - Intégrer Redux ou Zustand
3. **API** - Connecter à une API REST
4. **Base de données** - Ajouter SQLite ou AsyncStorage
5. **Authentification** - Système de login/logout
6. **Tests** - Ajouter Jest et React Native Testing Library

Bon développement ! 🚀 