import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Calendar, Users, Star, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';

export const Home: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/50 via-gray-50 to-gray-50"></div>
                <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-primary-200/30 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl"></div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in flex flex-col items-center">
                        <div className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-800 mb-4">
                            <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2 animate-pulse"></span>
                            The #1 Platform for Campus Events
                        </div>

                        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                            Connect, Create, and <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                                Celebrate Campus Life
                            </span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-xl text-gray-600 leading-relaxed">
                            The ultimate platform for college clubs to create unforgettable events, build communities, and track engagement. Everything you need in one beautiful place.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link to="/events">
                                <Button size="lg" className="w-full sm:w-auto text-lg px-8 h-14 shadow-xl shadow-blue-500/40 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold border-none hover:shadow-blue-500/50 transition-all duration-300">
                                    Explore Events
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>

                        <div className="pt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span>Free for Students</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span>Instant Setup</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span>Secure Platform</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Everything You Need to Manage Events
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Powerful tools designed specifically for college communities to thrive and grow.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: Calendar,
                                title: 'Event Management',
                                description: 'Create, edit, and manage events with detailed information, beautiful layouts, and smart scheduling.'
                            },
                            {
                                icon: Users,
                                title: 'Smart RSVP System',
                                description: 'Seamless registration with duplicate prevention, waitlists, and automated confirmations.'
                            },
                            {
                                icon: Star,
                                title: 'Feedback & Ratings',
                                description: 'Collect valuable insights with beautiful rating interfaces and detailed feedback forms.'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Analytics Dashboard',
                                description: 'Track attendance, view participation trends, and export data with beautiful visualizations.'
                            }
                        ].map((feature, index) => (
                            <Card key={index} className="group hover:-translate-y-1 transition-all duration-300 border-gray-100 shadow-lg shadow-gray-200/50">
                                <CardContent className="p-8">
                                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                                        <feature.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/80"></div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Trusted by Campus Communities
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
                        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">500+</div>
                            <div className="mt-2 text-lg font-medium text-gray-300">Active Clubs</div>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">10K+</div>
                            <div className="mt-2 text-lg font-medium text-gray-300">Events Created</div>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">50K+</div>
                            <div className="mt-2 text-lg font-medium text-gray-300">Happy Students</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
