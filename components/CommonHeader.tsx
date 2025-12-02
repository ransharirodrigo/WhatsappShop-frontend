import { commonStyles } from '@/assets/css/common_styles';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * Common Header Component for Buyer and Seller screens.
 * @param {object} props - Component properties.
 * @param {'buyer'|'seller'} props.type - The type of user to style the header (buyer or seller).
 * @param {string} props.userName - The user's name.
 * @param {string} props.greeting - The greeting message.
 * @param {string} props.profileRoute - The route to navigate to on avatar press (optional).
 */
export function CommonHeader({ type, userName, greeting, profileRoute }) {
  const router = useRouter();

  const headerStyle = type === 'buyer' ? commonStyles.buyerHeader : commonStyles.sellerHeader;
  const userNameStyle = type === 'buyer' ? commonStyles.buyerUserName : commonStyles.sellerUserName;
  const greetingStyle = type === 'buyer' ? commonStyles.buyerGreeting : commonStyles.sellerGreeting;
  const avatarStyle = type === 'buyer' ? commonStyles.buyerAvatar : commonStyles.sellerAvatar;

  const handleAvatarPress = () => {
    if (profileRoute && router) {
      router.push(profileRoute);
    }
  };

  return (
    <View style={[commonStyles.baseHeader, headerStyle]}>
      <View>
        <Text style={[commonStyles.userName, userNameStyle]}>{userName}</Text>
        <Text style={[commonStyles.greeting, greetingStyle]}>{greeting}</Text>
      </View>
      <TouchableOpacity 
        style={[commonStyles.avatar, avatarStyle]} 
        onPress={handleAvatarPress}
        disabled={!profileRoute}
      >
        <Image
          source={require('@/assets/images/dp.jpg')}
          style={commonStyles.avatarImage}
        />
      </TouchableOpacity>
    </View>
  );
}