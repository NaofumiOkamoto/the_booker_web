import { useState } from 'react';
import '../ToggleSwitch.css'; // スタイリング用のCSSをインポート

const ToggleSwitch: React.FC<{
  label: string,
  onChange: (b: boolean) => void
} > = ({ label, onChange }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
    onChange(!isOn); // 状態が変わったときに親コンポーネントに通知
  };

  return (
    <div className="toggle-switch">
      <span className='label'>{label}</span>
      <label>
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
