import EEATLayout from "./EEATLayout";

export default function EulaPage() {
  return (
    <EEATLayout title="End User License Agreement (EULA)">
      <p>Last updated: January 2025</p>

      <h2>Definitions</h2>
      <p>
        "Software" refers to Vyaparix billing and inventory management software. "Licensee" refers to the individual or entity that has purchased or downloaded the Software. "Licensor" refers to Vyaparix Technologies LLP.
      </p>

      <h2>Grant of License</h2>
      <p>
        Subject to payment of applicable fees and compliance with this EULA, Licensor grants Licensee a non-exclusive, non-transferable, perpetual (for Lifetime licenses) or term-limited (for Annual licenses) license to install and use the Software on Windows desktop computers owned or controlled by Licensee.
      </p>

      <h2>License Restrictions</h2>
      <ul>
        <li>Licensee may not sublicense, rent, lease, or transfer the Software</li>
        <li>Licensee may not reverse engineer, decompile, or disassemble the Software</li>
        <li>Licensee may not modify, adapt, or create derivative works based on the Software</li>
        <li>Licensee may not remove or alter any copyright notices or branding</li>
        <li>Licensee may not use the Software for illegal purposes</li>
      </ul>

      <h2>Installation and Use</h2>
      <ul>
        <li>A single license allows installation on one computer</li>
        <li>Licensee may transfer the license to a new computer after deactivating on the old one</li>
        <li>Licensee is responsible for maintaining backup copies of their data</li>
      </ul>

      <h2>Updates and Support</h2>
      <p>
        Licensor may provide updates, bug fixes, and technical support during the license period. Lifetime license holders receive updates and support for the lifetime of the product. Annual license holders receive updates and support for the subscription period.
      </p>

      <h2>Warranty Disclaimer</h2>
      <p>
        THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        IN NO EVENT SHALL LICENSOR BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, OR CONSEQUENTIAL DAMAGES WHATSOEVER ARISING OUT OF THE USE OR INABILITY TO USE THE SOFTWARE.
      </p>

      <h2>Termination</h2>
      <p>
        This license is effective until terminated. Licensee may terminate it by destroying the Software and all copies. Licensor may terminate if Licensee breaches any terms. Upon termination, Licensee must destroy all copies of the Software.
      </p>

      <h2>Governing Law</h2>
      <p>
        This EULA is governed by the laws of India. Any disputes shall be resolved in the courts of Ahmedabad, Gujarat.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about this EULA, contact us at vyaparix.co@gmail.com or call +91 8347402205.
      </p>
    </EEATLayout>
  );
}
