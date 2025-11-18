import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing, typography } from '../theme';

export default function HomeScreen({ navigation }) {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userProfile } = useAuth();

  useEffect(() => {
    loadDonations();

    // Subscrição em tempo real para novas doações
    const subscription = supabase
      .channel('donations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'donations' }, () => {
        loadDonations();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadDonations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('donations')
      .select(`
        *,
        donor:donor_id(full_name, phone),
        collector:collector_id(full_name),
        center:center_id(name)
      `)
      .order('created_at', { ascending: false })
      .limit(20);

    if (data) setDonations(data);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'disponivel': return colors.primary;
      case 'coletando': return '#3498db';
      case 'na_central': return '#9b59b6';
      case 'em_distribuicao': return '#f39c12';
      case 'entregue': return colors.success;
      case 'cancelada': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      'disponivel': 'Disponível',
      'coletando': 'Em coleta',
      'na_central': 'Na central',
      'em_distribuicao': 'Em distribuição',
      'entregue': 'Entregue',
      'cancelada': 'Cancelada'
    };
    return statusMap[status] || status;
  };

  const renderDonation = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DonationDetail', { donationId: item.id })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.item_description}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <Text style={styles.cardSubtitle}>
        Tipo: {item.pet_type === 'cao' ? '🐕 Cães' : item.pet_type === 'gato' ? '🐱 Gatos' : '🐾 Outros'}
      </Text>

      {item.donor && (
        <Text style={styles.cardInfo}>Doador: {item.donor.full_name}</Text>
      )}

      <Text style={styles.cardDate}>
        {new Date(item.created_at).toLocaleDateString('pt-BR')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Doações Disponíveis</Text>
        {userProfile && (
          <Text style={styles.welcomeText}>Olá, {userProfile.full_name}!</Text>
        )}
      </View>

      {userProfile?.role === 'doador' && (
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => navigation.navigate('CreateDonation')}
        >
          <Text style={styles.fabText}>+ Nova Doação</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={donations}
        renderItem={renderDonation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadDonations} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma doação disponível no momento</Text>
          </View>
        }
      />
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
  welcomeText: {
    ...typography.body,
    color: '#FFFFFF',
    marginTop: spacing.xs,
  },
  fabButton: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 999,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    ...typography.subtitle,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardSubtitle: {
    ...typography.body,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  cardInfo: {
    ...typography.body,
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  cardDate: {
    ...typography.placeholder,
    fontSize: 12,
    marginTop: spacing.sm,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
