import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, MapPin, CheckCircle, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';

interface Counselor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  availability: string[];
  languages: string[];
  image: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export function BookingSystem() {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingStep, setBookingStep] = useState(1);
  const [isBooked, setIsBooked] = useState(false);

  const counselors: Counselor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Anxiety & Depression',
      rating: 4.9,
      experience: '8 years',
      availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      languages: ['English', 'Spanish'],
      image: '/api/placeholder/100/100'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Academic Stress & ADHD',
      rating: 4.8,
      experience: '12 years',
      availability: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      languages: ['English', 'Mandarin'],
      image: '/api/placeholder/100/100'
    },
    {
      id: '3',
      name: 'Dr. Priya Patel',
      specialization: 'Relationship & Social Issues',
      rating: 4.9,
      experience: '6 years',
      availability: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat'],
      languages: ['English', 'Hindi', 'Gujarati'],
      image: '/api/placeholder/100/100'
    },
  ];

  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: false },
    { time: '5:00 PM', available: true },
  ];

  const handleBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      setBookingStep(1);
      setSelectedCounselor(null);
      setSelectedDate('');
      setSelectedTime('');
      setIsBooked(false);
    }, 3000);
  };

  if (isBooked) {
    return (
      <div className="min-h-screen pt-24 pb-8 px-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-green-800 mb-4"
          >
            Session Booked Successfully!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground mb-6"
          >
            You'll receive a confirmation email with session details and a secure meeting link.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-4"
          >
            <p className="text-green-800">
              <strong>{selectedCounselor?.name}</strong><br />
              {selectedDate} at {selectedTime}
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4 text-primary">Book a Counseling Session</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Schedule a confidential session with one of our professional counselors
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-12"
        >
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  bookingStep >= step
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {step}
              </motion.div>
              {step < 3 && (
                <div
                  className={`w-16 h-1 mx-4 transition-all duration-300 ${
                    bookingStep > step ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Counselor */}
          {bookingStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-center mb-8">Choose Your Counselor</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {counselors.map((counselor, index) => (
                  <motion.div
                    key={counselor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedCounselor(counselor);
                      setBookingStep(2);
                    }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20 cursor-pointer group"
                  >
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="mb-2">{counselor.name}</h3>
                      <p className="text-muted-foreground mb-2">{counselor.specialization}</p>
                      
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{counselor.rating}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">{counselor.experience} experience</p>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Languages:</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {counselor.languages.map((lang) => (
                            <span
                              key={lang}
                              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Available:</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {counselor.availability.map((day) => (
                            <span
                              key={day}
                              className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="text-center text-primary group-hover:text-primary/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      Select Counselor →
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Date & Time */}
          {bookingStep === 2 && selectedCounselor && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="text-center mb-8">Select Date & Time</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Date Selection */}
                  <Card className="p-6">
                    <h3 className="mb-4 flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>Choose Date</span>
                    </h3>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="mb-4"
                    />
                  </Card>

                  {/* Time Selection */}
                  <Card className="p-6">
                    <h3 className="mb-4 flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>Choose Time</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <motion.button
                          key={slot.time}
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`p-3 rounded-xl border text-sm transition-all duration-300 ${
                            selectedTime === slot.time
                              ? 'bg-primary text-primary-foreground border-primary'
                              : slot.available
                              ? 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5'
                              : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                          whileHover={slot.available ? { scale: 1.02 } : {}}
                          whileTap={slot.available ? { scale: 0.98 } : {}}
                        >
                          {slot.time}
                        </motion.button>
                      ))}
                    </div>
                  </Card>
                </div>

                <div className="flex justify-center mt-8 space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setBookingStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setBookingStep(3)}
                    disabled={!selectedDate || !selectedTime}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Booking Details */}
          {bookingStep === 3 && selectedCounselor && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-2xl mx-auto">
                <h2 className="text-center mb-8">Session Details</h2>
                
                <Card className="p-6 mb-6">
                  <h3 className="mb-4">Your Session</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-primary" />
                      <span><strong>Counselor:</strong> {selectedCounselor.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span><strong>Date:</strong> {selectedDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span><strong>Time:</strong> {selectedTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span><strong>Location:</strong> Online Session</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 mb-6">
                  <h3 className="mb-4">Additional Information (Optional)</h3>
                  <Textarea
                    placeholder="Is there anything specific you'd like to discuss in this session?"
                    className="mb-4"
                  />
                  <Input
                    placeholder="Emergency contact (optional)"
                    className="mb-4"
                  />
                </Card>

                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setBookingStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleBooking}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}