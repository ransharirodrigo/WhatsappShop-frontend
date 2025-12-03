import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentPadding: {
    padding: 20,
  },
  
  baseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  buyerHeader: {
    backgroundColor: '#34C488',
  },
  sellerHeader: {
    backgroundColor: '#fff',
  },

  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buyerUserName: {
    color: '#fff',
  },
  sellerUserName: {
    color: '#333',
  },
  
  greeting: {
    fontSize: 16,
    marginTop: 4,
  },
  buyerGreeting: {
    color: '#e0f2e0',
  },
  sellerGreeting: {
    color: '#999',
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyerAvatar: {
    backgroundColor: '#8B7FFF',
    borderWidth: 3,
    borderColor: '#fff',
    borderStyle: 'dashed',
  },
  sellerAvatar: {
    backgroundColor: '#7C4DFF',
    borderWidth: 3,
    borderColor: '#333',
  },
  
  avatarImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
});