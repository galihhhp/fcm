"use client";
import PushNotificationForm from './components/PushNotificationForm'

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <PushNotificationForm />
      </div>
    </main>
  )
}


export default Home
