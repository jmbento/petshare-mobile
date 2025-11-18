import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing, typography } from '../theme';

export default function ProfileScreen() {
  const { userProfile, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => signOut(), style: 'destructive' },
      ]
    );
  };

  const getRoleLabel = (role) => {
    const roles = {
      'admin': 'Administrador',
      'gestor': 'Gestor',
      'doador': 'Doador',
      'coletor': 'Coletor',
      'distribuidor': 'Distribuidor',
      'necessitado': 'Necessitado',
      'patrocinador': 'Patrocinador'
    };
    return roles[role] || role;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Perfil</Text>
      </View>

      {userProfile && (
        <View style={styles.content}>
          <View style={styles.infoCard}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>{userProfile.full_name}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{userProfile.email}</Text>
          </View>

          {userProfile.phone && (
            <View style={styles.infoCard}>
              <Text style={styles.label}>Telefone</Text>
              <Text style={styles.value}>{userProfile.phone}</Text>
            </View>
          )}

          <View style={styles.infoCard}>
            <Text style={styles.label}>Tipo de conta</Text>
            <Text style={styles.value}>{getRoleLabel(userProfile.role)}</Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.secondary,
  },
  title: {
    ...typography.title,
    color: '#FFFFFF',
  },
  content: {
    padding: spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  label: {
    ...typography.placeholder,
    fontSize: 12,
    marginBottom: spacing.xs,
  },
  value: {
    ...typography.body,
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: colors.error,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
