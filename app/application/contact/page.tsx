import React from 'react';
import { Card, CardBody, Input, Textarea, Button } from "@nextui-org/react";

export default function ContactPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardBody className="space-y-6">
            <Input
              label="Name"
              placeholder="Enter your name"
              variant="bordered"
            />
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
            />
            <Textarea
              label="Message"
              placeholder="Enter your message"
              variant="bordered"
              minRows={5}
            />
            <Button
              color="primary"
              size="lg"
              className="w-full"
            >
              Send Message
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}