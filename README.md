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

1. **Compteur interactif** - Boutons pour incrémenter/décrémenter
2. **Changement de thème** - Basculer entre mode clair et sombre
3. **Interface moderne** - Design avec des cartes et des ombres
4. **Responsive** - S'adapte à toutes les tailles d'écran

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