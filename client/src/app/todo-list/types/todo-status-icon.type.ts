export interface TodoStatusIcon {
  iconRef: IconRef;
  iconColor: IconColor;
}
type IconRef = 'check_circle_outline' | 'pending';
type IconColor = 'primary' | 'warn';
