import type { CollectionAfterChangeHook } from 'payload';

/**
 * afterChange hook for the Enrollments collection.
 * Sends an enrollment confirmation email when paymentStatus changes to 'completed'.
 *
 * TODO: Replace console.log with actual email sending via Resend.
 * - Import { resend } from '@/lib/resend'
 * - Import EnrollmentConfirmation from '@/emails/EnrollmentConfirmation'
 */
export const sendEnrollmentEmail: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  // Only fire when paymentStatus transitions to 'completed'
  const isNewCompleted = operation === 'create' && doc.paymentStatus === 'completed';
  const isUpdatedToCompleted =
    operation === 'update' &&
    previousDoc?.paymentStatus !== 'completed' &&
    doc.paymentStatus === 'completed';

  if (isNewCompleted || isUpdatedToCompleted) {
    req.payload.logger.info(
      `Enrollment ${doc.id} payment completed — sending confirmation email.`,
    );

    // Placeholder: replace with actual Resend email integration
    // const student = typeof doc.student === 'object' ? doc.student : await req.payload.findByID({ collection: 'students', id: doc.student });
    // const course = typeof doc.course === 'object' ? doc.course : await req.payload.findByID({ collection: 'courses', id: doc.course });
    //
    // await resend.emails.send({
    //   from: 'Unique Mentors <noreply@uniquementors.com>',
    //   to: student.email,
    //   subject: `Enrollment Confirmed — ${course.title}`,
    //   react: EnrollmentConfirmation({ student, course, enrollment: doc }),
    // });

    console.log(`[sendEnrollmentEmail] Would send email for enrollment ${doc.id}`);
  }

  return doc;
};
